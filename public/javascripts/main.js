const word_en = document.querySelector('.word_en')
const word_ch = document.querySelector('.word_ch')
const btn = document.querySelector('.btn-en_ch_shift')

btn.addEventListener('click', (event) => {
  if (word_en.classList.contains('word_hidden')) {
    word_en.classList.remove('word_hidden')
    word_ch.classList.add('word_hidden')
  } else {
    word_en.classList.add('word_hidden')
    word_ch.classList.remove('word_hidden')
  }
})
