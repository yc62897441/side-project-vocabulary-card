const word_en = document.querySelector('.word_en')
const word_ch = document.querySelector('.word_ch')
const btn_en_ch_shift = document.querySelector('.btn-en_ch_shift')
const btn_show_shift = document.querySelector('.btn-show_shift')

const model = {
  word_hidden: 'word_en',
  word_hidden_on: false
}

const controller = {
  en_ch_shift: function (evenr) {
    if (model.word_hidden === 'word_en') {
      word_en.classList.remove('word_hidden')
      word_ch.classList.add('word_hidden')
      model.word_hidden = 'word_ch'
    } else if (model.word_hidden === 'word_ch') {
      word_en.classList.add('word_hidden')
      word_ch.classList.remove('word_hidden')
      model.word_hidden = 'word_en'
    }
    model.word_hidden_on = false
  },
  show_shift: function (event) {
    if (!model.word_hidden_on) {
      model.word_hidden_on = true
      if (model.word_hidden === 'word_en') {
        word_en.classList.remove('word_hidden')
      } else if (model.word_hidden === 'word_ch') {
        word_ch.classList.remove('word_hidden')
      }
    } else {
      model.word_hidden_on = false
      if (model.word_hidden === 'word_en') {
        word_en.classList.add('word_hidden')
      } else if (model.word_hidden === 'word_ch') {
        word_ch.classList.add('word_hidden')
      }
    }
  }
}

btn_en_ch_shift.addEventListener('click', (event) => {
  controller.en_ch_shift(event)
})

btn_show_shift.addEventListener('click', (event) => {
  controller.show_shift(event)
})