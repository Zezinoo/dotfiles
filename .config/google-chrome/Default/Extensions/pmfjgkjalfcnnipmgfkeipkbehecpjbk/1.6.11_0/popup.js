$(async function() {
  let name = document.getElementById('name')
  let steamid = document.getElementById('steamid')
  let img = document.getElementById('img')
  let displ = document.getElementById('basic')
  let ac = document.getElementById('accept')
  let antiScam = document.getElementById('antiScam')
  let withdrawWax = document.getElementById('acceptWithdraws')
  let info = await Promise.all([
    getStorage('name'),
    getStorage('steamid'),
    getStorage('avatar'),
    getStorage('auto_accept'),
    getStorage('acceptWithdraw'),
  ])

  setOnline(await getStorage('onlineTxt'), await getStorage('onlineBg'))
  if (info.length && info[0].length > 0) {
    displ.style.display = 'block'
    img.style.display = 'block'
    name.innerHTML = info[0]
    steamid.innerHTML = info[1]
    img.src = info[2]

    document.getElementById('acceptWithdraw').checked = info[4]
    ac.style.display = 'block'
    withdrawWax.style.display = 'block'

    document.getElementById('autoAccept').checked = info[3]
  }
  function setOnline(text, color) {
    let online = document.getElementById('online')
    online.innerText = text
    online.style.background = color
  }

  function getStorage(name) {
    return new Promise(res => {
      chrome.storage.local.get([`${name}`], function(result) {
        res(result[name])
      })
    })
  }

  const checkbox = document.getElementById('autoAccept')
  const checkboxAntiScam = document.getElementById('antiScam')
  const waxAccept = document.getElementById('acceptWithdraw')
  waxAccept.addEventListener('change', event => chrome.storage.local.set({ [`acceptWithdraw`]: event.target.checked }))
  checkboxAntiScam.addEventListener('change', event => chrome.storage.local.set({ [`antiScam`]: event.target.checked }))
  checkbox.addEventListener('change', event => chrome.storage.local.set({ [`auto_accept`]: event.target.checked }))
})
