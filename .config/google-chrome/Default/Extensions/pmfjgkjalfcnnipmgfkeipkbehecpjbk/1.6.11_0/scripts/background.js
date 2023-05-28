let SId = '';
let apiKey = '';
const url = 'https://api.waxpeer.com';
let s64 = '';
let tradeurl = null;
let counter = 0;
var myAudio = new Audio(chrome.runtime.getURL('/buy_pick.mp3'));
let opt = {
  type: 'basic',
  title: 'Confirm trade',
  message: 'Someone bought your skin, please accept. You have 5 minutes.',
  iconUrl: 'icon128.png',
  silent: false,
};
class Waxpeer {
  ex = null;
  sent = {};
  accepted = {};
  ws = null;
  tries = 0;
  extension(ex) {
    this.setStorage('acceptWithdraw', true);
    this.ex = ex;
  }
  async fetchTradelink() {
    try {
      let req = await sendRequest({
        method: 'GET',
        url: `https://steamcommunity.com/profiles/${s64}/tradeoffers/privacy#trade_offer_access_url`,
      });
      let html = req.replace(/\s/g, '');
      tradeurl = html.substring(
        html.indexOf(`id="trade_offer_access_url"`) + 34,
        html.indexOf(`class="tradeoffer_privacy_newurl"`) - 20,
      );
    } catch (e) {}
  }
  async checkAndAcceptTrades() {
    try {
      let body = await sendRequest({
        method: 'GET',
        url: `https://api.steampowered.com/IEconService/GetTradeOffers/v1/?key=${apiKey}&get_received_offers=1`,
      });
      if (body.response) {
        let acceptAuto = await this.getStorage('auto_accept');
        for (let i of body.response.trade_offers_received) {
          if (i.trade_offer_state === 2 && !i['items_to_give'] && acceptAuto) {
            let api = await sendRequest({
              method: 'GET',
              url: url + `/v1/convert-to-steamid64/?id=${i.accountid_other}`,
            });
            if (api.success) {
              await this.delay(1000);
              await sendRequest({
                method: 'POST',
                url: `https://steamcommunity.com/tradeoffer/${i.tradeofferid}/accept`,
                data: {
                  sessionid: SId,
                  serverid: 1,
                  tradeofferid: i.tradeofferid,
                  partner: api.steamid64,
                },
              });
            }
          }
        }
      }
    } catch (e) {
      if (e.status >= 500 || e.status === 429) await this.delay(5000);
      else if (e.status === 403) await this.createApi();
    }
  }

  async start() {
    try {
      if (!s64 || counter % 15 === 0) await this.getSession();

      if (!s64 && this.ws) {
        this.ws.close();

        this.ws = null;
      }
      if (!apiKey && s64) {
        await this.getAPikeyAndSession();

        if (apiKey) this.ws.send(JSON.stringify({ name: 'auth', steamid: s64, apiKey, tradeurl }));
        console.log(apiKey);
      }

      counter += 1;
      let acceptAuto = await this.getStorage('auto_accept');
      if (s64 && SId && apiKey && acceptAuto) {
        await this.checkAndAcceptTrades();
      }
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => this.start(), 5000);
  }

  connect_init() {
    let w = this;
    if (w.ws) return w.ws.close();
    w.ws = new WebSocket(config.WS_LINK);
    let t = (w.tries + 1) * 1e3;
    w.ws.onerror = function (e) {
      console.log('Error', e);
    };
    w.ws.onclose = function (e) {
      w.ex.change_ext_status(0);
      w.ws = null;
      w.tries += 1;
      if (s64 && SId) {
        setTimeout(function () {
          w.connect_init();
        }, t);
      }
    };
    w.ws.onopen = function () {
      if (s64) {
        w.tries = 0;
        w.ex.change_ext_status(1);
        clearInterval(w.int);
        w.int = setInterval(() => {
          if (w.ws) w.ws.send(JSON.stringify({ name: 'ping' }));
        }, 25000);
        w.ws.send(JSON.stringify({ name: 'auth', steamid: s64, apiKey, tradeurl }));
      }
    };
    w.ws.onmessage = function (e) {
      let d = JSON.parse(e.data);
      if (d.name === 'send-trade') {
        let trade = d.data;
        if (!w.sent[trade.waxid]) {
          w.sendTradeRequest(trade);
          w.sent[trade.waxid] = 1;
        }
      } else if (d.name === 'accept-trade') {
        try {
          if (!w.accepted[d.data.tradeid]) {
            sendRequest({
              url: `https://steamcommunity.com/tradeoffer/${d.data.tradeid}/accept`,
              method: 'post',
              data: {
                sessionid: SId,
                serverid: 1,
                tradeofferid: d.data.tradeid,
                partner: d.data.partner,
              },
            }).then(console.log);
            w.accepted[d.data.tradeid] = 1;
          }
        } catch (e) {
          console.log(e);
        }
      } else if (d.name === 'delete') {
        delete w[d.data.name][d.data.value];
        console.log(w.accepted, w.sent);
      } else if (d.name === 'accept_withdraw') {
        w.getStorage('acceptWithdraw').then((check) => {
          console.log(check, w.accepted, d.data.tradeid);
          if (check && !w.accepted[d.data.tradeid]) {
            sendRequest({
              url: `https://steamcommunity.com/tradeoffer/${d.data.tradeid}/accept`,
              method: 'post',
              data: {
                sessionid: SId,
                serverid: 1,
                tradeofferid: d.data.tradeid,
                partner: d.data.partner,
              },
            }).then(console.log);
            w.accepted[d.data.tradeid] = 1;
          }
        });
      } else if (d.name === 'cancelTrade') {
        w.cancelSentTrade(d.data.trade_id);
      } else if (d.name === 'notify') {
        chrome.notifications.create({
          type: 'basic',
          title: d.data.title,
          message: d.data.message,
          iconUrl: 'icon128.png',
          silent: false,
        });
      }
    };
  }
  removeUserStorage() {
    this.ws = null;
    s64 = null;
    SId = null;
    clearInterval(this.int);
    this.setStorage('name', '');
    this.setStorage('avatar', '');
    this.setStorage('steamid', '');
  }
  setStorage(name, value) {
    chrome.storage.local.set({ [`${name}`]: value });
  }
  setOnlineBtn(txt, bg) {
    this.setStorage('onlineTxt', txt);
    this.setStorage('onlineBg', bg);
  }
  async cancelSentTrade(trade_id) {
    try {
      const cancelReq = await sendRequest({
        method: 'POST',
        data: {
          sessionid: SId,
        },
        url: `https://steamcommunity.com/tradeoffer/${trade_id}/cancel`,
      });
    } catch (e) {}
  }
  async getAPikeyAndSession() {
    try {
      let html = await sendRequest({
        method: 'GET',
        url: `https://steamcommunity.com/dev/apikey`,
      });
      html = html.replace(/\s/g, '');
      if (html.indexOf('steamcommunity.com/dev/registerkey') !== -1) {
        await this.delay(1000);
        return await this.createApi();
      } else if (html.indexOf('cannotregister') !== -1) {
        this.setOnlineBtn(`You can't register API KEY`, '#eb595b');
        return await this.delay(100000);
      }

      apiKey = this.parsePageApi(html);
      this.setStorage('api', apiKey);

      await this.delay(500);
      SId = html.substring(html.indexOf('g_sessionID') + 13, html.indexOf('g_steamID') - 2);
    } catch (e) {
      console.log(e);
      apiKey = '';

      if (e.status === 403 || e.status === 429) await this.delay(30e3);
      else if (e.status >= 500) await this.delay(1500);
    }
  }
  parsePageApi(html) {
    // Parse the page
    html = html.replace(/\s/g, '');
    let part = html.substring(html.indexOf(`id="bodyContents_ex">`));
    return part.substring(part.indexOf(`:`) + 1, part.indexOf(`</p`));
  }

  async createApi() {
    try {
      if (!s64 || !SId) return;
      let html = await sendRequest({
        method: 'POST',
        url: `https://steamcommunity.com/dev/registerkey`,
        data: {
          domain: 'localhost',
          agreeToTerms: 'agreed',
          sessionid: SId,
        },
      });
      if (html.indexOf('No session ID') !== -1) {
        this.setStorage('sessionId', '');
        this.setOnlineBtn('Please Sign in to steam', 'red');
        await this.delay(2500);
        return await this.createApi();
      } else {
        apiKey = this.parsePageApi(html);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getStorage(name) {
    return new Promise((res) => {
      chrome.storage.local.get([`${name}`], function (result) {
        res(result[name]);
      });
    });
  }
  async getSession() {
    try {
      let html = await sendRequest({
        method: 'GET',
        url: `https://steamcommunity.com/`,
      });
      html = html.replace(/\s/g, '');

      let steamIdPart = html.substring(html.indexOf('g_steamID') + 10);

      if (steamIdPart.charAt(0) === 'f') {
        this.removeUserStorage();
        return this.setOnlineBtn(`Make sure you're logged in to steam`, '#eb595b');
      } else if (steamIdPart.charAt(0) === `"`)
        s64 = html.substring(html.indexOf('g_steamID') + 11, html.indexOf('g_steamID') + 28);
      if (!tradeurl) await this.fetchTradelink();
      if (!this.ws) this.connect_init();

      this.setOnlineBtn(`ONLINE`, 'green');

      let name = html.substring(
        html.indexOf('data-miniprofile=') + 29,
        html.indexOf('responsive_menu_user_wallet') - 79,
      );

      let avatar = html.substring(html.indexOf('user_avatar') + 40, html.indexOf('g_sessionID') - 54).replace('"', '');

      SId = html.substring(html.indexOf('g_sessionID') + 13, html.indexOf('g_steamID') - 2);
      if (name.length > 7) this.setStorage('name', name.substring(0, 7) + '...');
      else this.setStorage('name', name);
      this.setStorage('avatar', avatar);
      this.setStorage('steamid', s64);
    } catch (e) {
      this.removeUserStorage();
      if (e.status === 403 || e.status === 429) await this.delay(15e3);
      else if (e.status >= 500) await this.delay(1500);
    }
  }

  async sendTradeRequest(i) {
    let data = {
      trade_offer_create_params: JSON.stringify({
        trade_offer_access_token: i.tradelink.substring(i.tradelink.indexOf('token=') + 6, i.tradelink.length),
      }),
      sessionid: SId,
      serverid: 1,
      partner: i.partner,
      tradeoffermessage: i.tradeoffermessage,
      json_tradeoffer: JSON.stringify({
        ...i.json_tradeoffer,
      }),
    };
    sendRequest({
      method: 'POST',
      url: 'https://steamcommunity.com/tradeoffer/new/send',
      data,
    })
      .then((res) => {
        myAudio.play();
        sent[i.costum_id] = 1;
        chrome.notifications.create(opt);
      })
      .catch(async (e) => {
        sendRequest({
          url: `${url}/v1/handle-errors/?api=${apiKey}&steam_id=${s64}&trade_id=${i.costum_id}`,
          method: 'POST',
          data: JSON.stringify(e),
        });

        if (e.status === 429 || e.status >= 500) await this.delay(2500);
        else if (e.status === 403) {
          this.removeUserStorage();
          sent[i.costum_id] = 1;
        }
      });
  }

  async delay(n) {
    return new Promise((resolve) => setTimeout(resolve, n));
  }
}

let beforeSent = function (e) {
  var t = null,
    r = e.url,
    n = e.method,
    a = /https:\/\/steamcommunity.com\/tradeoffer\/(\d+)\/accept/gi,
    s = /https:\/\/steamcommunity.com\/tradeoffer\/new\/send/gi;
  switch (!0) {
    case a.test(r) && 'POST' === n.toUpperCase():
      t = r.replace('/accept', '');
      break;
    case s.test(r) && 'POST' === n.toUpperCase():
      t = r.replace('/send', '');
      break;
    default:
      t = null;
  }
  if (t) {
    var o = e.requestHeaders.find(function (e) {
      return 'referer' === e.name.toLowerCase();
    });
    void 0 !== o ? (e.requestHeaders[o].value = t) : e.requestHeaders.push({ name: 'Referer', value: t });
  }
  return { requestHeaders: e.requestHeaders };
};

chrome.webRequest.onBeforeSendHeaders.addListener(beforeSent, { urls: ['https://steamcommunity.com/tradeoffer/*'] }, [
  'requestHeaders',
  'blocking',
  'extraHeaders',
]);

const sendRequest = function (t) {
  return new Promise(function (e, n) {
    return $.ajax(t).done(e).fail(n);
  });
};
