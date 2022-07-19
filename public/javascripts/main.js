const vocabulary_containers = document.querySelector('.vocabulary_containers')
const modal_body = document.querySelector('.modal-body')
const word_ens = document.querySelectorAll('.word_en')
const word_chs = document.querySelectorAll('.word_ch')
const word_notes = document.querySelectorAll('.word_note')
const btn_en_ch_shift = document.querySelector('.btn-en_ch_shift')
const btn_show_shift = document.querySelector('.btn-show_shift')
const btn_previous = document.querySelector('.btn-previous')
const btn_next = document.querySelector('.btn-next')

for (let i = 1; i < vocabulary_containers.children.length; i++) {
  vocabulary_containers.children[i].classList.add('display_none')
  modal_body.children[i].classList.add('display_none')
}

const model = {
  word_hidden: 'word_en',
  word_hidden_on: true,
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
    model.word_hidden_on = true
  },
  show_shift: function (event) {
    if (model.word_hidden_on) {
      model.word_hidden_on = false
      if (model.word_hidden === 'word_en') {
        word_ens.forEach(word_en => word_en.classList.remove('word_hidden'))
      } else if (model.word_hidden === 'word_ch') {
        word_chs.forEach(word_ch => word_ch.classList.remove('word_hidden'))
      }
    } else {
      model.word_hidden_on = true
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
      modal_body.children[model.current_word_index].classList.add('display_none')
      modal_body.children[model.current_word_index - 1].classList.remove('display_none')
      model.current_word_index = model.current_word_index - 1

      // 切換到上、下一個單字時，將單字自動轉為 hidden 狀態
      this.previous_next_auto_word_hidden_on()
    } else {
      return
    }
  },
  next: function (event) {
    if (model.current_word_index < model.words_amount - 1) {
      vocabulary_containers.children[model.current_word_index].classList.add('display_none')
      vocabulary_containers.children[model.current_word_index + 1].classList.remove('display_none')
      modal_body.children[model.current_word_index].classList.add('display_none')
      modal_body.children[model.current_word_index + 1].classList.remove('display_none')
      model.current_word_index = model.current_word_index + 1

      // 切換到上、下一個單字時，將單字自動轉為 hidden 狀態
      this.previous_next_auto_word_hidden_on()
    } else {
      return
    }
  },
  previous_next_auto_word_hidden_on: function () {
    if (model.word_hidden === 'word_en') {
      word_ens.forEach(word_en => word_en.classList.add('word_hidden'))
    } else if (model.word_hidden === 'word_ch') {
      word_chs.forEach(word_ch => word_ch.classList.add('word_hidden'))
    }
    model.word_hidden_on = true
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
