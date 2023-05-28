$(function() {
  var leftSide = `<div class="left-side-nav">
    <button class="btn draw-border" id="addAll">Add all</button>
    <button class="btn draw-border" id="addPage">Add Page</button>
    <button class="btn draw-border" id="deleteAll">Delete All</button>
  </div>`
  $('.trade_left').append(leftSide)
  $('#addAll').click(function() {
    ui_helper.moveItems('.inventory_ctn:visible', '', true)
  })
  $('#addPage').click(function() {
    ui_helper.moveItems('#inventories:visible .inventory_ctn:visible', ':visible', true)
  })
  $('#deleteAll').click(function() {
    ui_helper.moveItems('#trade_yours:visible', ':visible', true)
  })
  var ui_helper = {
    // move items from/to inventories depending on filter used
    moveItems: function(containerSelector, itemVisibility, direction, filter) {
      /* check if we are already moving some stuff */
      if (ui_helper.isButtonsDisabled()) return

      ui_helper.disableButtons()

      var event = new MouseEvent('dblclick', {
        view: window,
        bubbles: true,
        cancelable: true,
      })

      var items = $(containerSelector)
        .find('.item' + itemVisibility)
        .toArray()

      if (filter) {
        if (filter.keys) {
          for (var i = items.length - 1; i >= 0; i--) {
            var marketname = $(items[i]).attr('data-marketname')
            var properties = util.getProperties(marketname)
            if (!properties.isKey) items.splice(i, 1)
            else if (!filter.vanilla && properties.isVanilla) items.splice(i, 1)
          }

          while (items.length > filter.count) items.splice(i, 1)
        } else if (filter.name) {
          for (var i = items.length - 1; i >= 0; i--) {
            var marketname = $(items[i]).attr('data-marketname')
            if (marketname !== filter.name) items.splice(i, 1)
          }
        }
      }

      if (!direction) items = items.reverse()

      ui_helper.chainCall(
        items,
        function(item) {
          item.dispatchEvent(event)
        },
        0,
        function() {
          ui_helper.enableButtons()
        },
      )
    },
    chainCall: function(array, method, timeout, callback) {
      var index = 0
      var batch = 1

      ;(function doNext() {
        var callNext = false
        for (var i = 0; i < batch && index < array.length; i++) {
          callNext = method(array[index++]) !== false
        }

        if (callNext) setTimeout(doNext, timeout)
        else {
          if (callback) callback()
        }
      })()
    },

    disableButtons: function() {
      $('#addPage')
        .off()
        .addClass('disabled')
    },

    isButtonsDisabled: function() {
      return $('#addPage').hasClass('disabled')
    },

    enableButtons: function() {
      $('#addPage').removeClass('disabled')
    },
  }
  $('#deleteAll').click(function() {})
})
