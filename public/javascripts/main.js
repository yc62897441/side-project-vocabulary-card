const vocabulary_containers = document.querySelector('.vocabulary_containers')
const word_ens = document.querySelectorAll('.word_en')
const word_chs = document.querySelectorAll('.word_ch')
const btn_en_ch_shift = document.querySelector('.btn-en_ch_shift')
const btn_show_shift = document.querySelector('.btn-show_shift')
const btn_previous = document.querySelector('.btn-previous')
const btn_next = document.querySelector('.btn-next')

for (let i = 1; i < vocabulary_containers.children.length; i++) {
  vocabulary_containers.children[i].classList.add('display_none')
}

const model = {
  word_hidden: 'word_en',
  word_hidden_on: false,
  current_word_index: 0,
  words_amount: vocabulary_containers.children.length
}

const controller = {
  en_ch_shift: function (event) {
    if (model.word_hidden === 'word_en') {
      word_ens.forEach(word_en => word_en.classList.remove('word_hidden'))
      word_chs.forEach(word_ch => word_ch.classList.add('word_hidden'))
      model.word_hidden = 'word_ch'
    } else if (model.word_hidden === 'word_ch') {
      word_ens.forEach(word_en => word_en.classList.add('word_hidden'))
      word_chs.forEach(word_ch => word_ch.classList.remove('word_hidden'))
      model.word_hidden = 'word_en'
    }
    model.word_hidden_on = false
  },
  show_shift: function (event) {
    if (!model.word_hidden_on) {
      model.word_hidden_on = true
      if (model.word_hidden === 'word_en') {
        word_ens.forEach(word_en => word_en.classList.remove('word_hidden'))
      } else if (model.word_hidden === 'word_ch') {
        word_chs.forEach(word_ch => word_ch.classList.remove('word_hidden'))
      }
    } else {
      model.word_hidden_on = false
      if (model.word_hidden === 'word_en') {
        word_ens.forEach(word_en => word_en.classList.add('word_hidden'))
      } else if (model.word_hidden === 'word_ch') {
        word_chs.forEach(word_ch => word_ch.classList.add('word_hidden'))
      }
    }
  },
  previous: function (event) {
    if (model.current_word_index > 0) {
      vocabulary_containers.children[model.current_word_index].classList.add('display_none')
      vocabulary_containers.children[model.current_word_index - 1].classList.remove('display_none')
      model.current_word_index = model.current_word_index - 1
    } else {
      return
    }
  },
  next: function (event) {
    if (model.current_word_index < model.words_amount - 1) {
      vocabulary_containers.children[model.current_word_index].classList.add('display_none')
      vocabulary_containers.children[model.current_word_index + 1].classList.remove('display_none')
      model.current_word_index = model.current_word_index + 1
    } else {
      return
    }
  }
}

btn_en_ch_shift.addEventListener('click', (event) => {
  controller.en_ch_shift(event)
})

btn_show_shift.addEventListener('click', (event) => {
  controller.show_shift(event)
})

btn_previous.addEventListener('click', (event) => {
  controller.previous(event)
})

btn_next.addEventListener('click', (event) => {
  controller.next(event)
})
