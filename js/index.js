const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PlAYER_STORAGE_KEY = "F8_PLAYER"

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')



const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: {},
    // JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},

    songs: [
        {
            name: 'Chuyện rằng',
            singer: 'Thịnh Suy',
            path: './assets/audio/song1.mp3',
            image: './assets/img/img1.jpg'
        },
        {
            name: 'Ghé qua',
            singer: 'Dick x PC x Tofu',
            path: './assets/audio/song2.mp3',
            image: './assets/img/img2.jpg'
        },
        {
            name: 'Để quên',
            singer: 'Ngọt',
            path: './assets/audio/song3.mp3',
            image: './assets/img/img3.jpg'
        },
        {
            name: 'Một đêm say',
            singer: 'Thịnh Suy',
            path: './assets/audio/song4.mp3',
            image: './assets/img/img4.jpg'
        },
        {
            name: 'Tiny love',
            singer: 'Thịnh Suy',
            path: './assets/audio/song5.mp3',
            image: './assets/img/img5.jpg'
        },
        {
            name: 'Chết trong em',
            singer: 'Thịnh Suy',
            path: './assets/audio/song6.mp3',
            image: './assets/img/img6.png'
        },
        {
            name: 'Id31072019',
            singer: 'W/n',
            path: './assets/audio/song7.mp3',
            image: './assets/img/img7.jpg'
        },
        {
            name: '3 1 0 7 2',
            singer: 'W/n',
            path: './assets/audio/song8.mp3',
            image: './assets/img/img8.jpg'
        },
        {
            name: '3 1 0 7',
            singer: 'W/n',
            path: './assets/audio/song9.mp3',
            image: './assets/img/img9.jpg'
        },
        {
            name: 'Chuyện đôi ta',
            singer: 'Emcee L ft. Muội',
            path: './assets/audio/song10.mp3',
            image: './assets/img/img10.jpg'
        },
        {
            name: 'Yêu 5',
            singer: 'Rhymastic',
            path: './assets/audio/song11.mp3',
            image: './assets/img/img11.jpg'
        },
        {
            name: 'Ánh sao và bầu trời',
            singer: 'T.R.I',
            path: './assets/audio/song12.mp3',
            image: './assets/img/img12.jpg'
        },
        {
            name: 'Bao tiền một mớ bình yên',
            singer: '14 Casper',
            path: './assets/audio/song13.mp3',
            image: './assets/img/img13.jpg'
        },
        {
            name: 'Chân Ái',
            singer: 'Thịnh Suy',
            path: './assets/audio/song14.mp3',
            image: './assets/img/img14.jpg'
        },
        {
            name: 'Không thể say',
            singer: 'HIEUTHUHAI',
            path: './assets/audio/song15.mp3',
            image: './assets/img/img15.jpg'
        },
        {
            name: 'NOLOVENOLIVE',
            singer: 'HIEUTHUHAI',
            path: './assets/audio/song16.mp3',
            image: './assets/img/img16.jpg'
        },
        {
            name: 'Lời nói điêu trên môi em',
            singer: 'Đổ Nguyên Phúc, LilZpoet',
            path: './assets/audio/song17.mp3',
            image: './assets/img/img17.jpg'
        },
        {
            name: 'Kẻ điên tin vào tình yêu',
            singer: 'Đổ Nguyên Phúc, LilZpoet',
            path: './assets/audio/song18.mp3',
            image: './assets/img/img18.jpg'
        },
        {
            name: 'Mười ngàn năm',
            singer: 'PC',
            path: './assets/audio/song19.mp3',
            image: './assets/img/img19.jpg'
        },
        {
            name: 'Sống cho hết đời thanh xuân',
            singer: 'Dick, Xám, TUYẾT',
            path: './assets/audio/song20.mp3',
            image: './assets/img/img20.jpg'
        },
    ],

    setConfig: function (key, value) {
        this.config[key] = value;
        // (2/2) Uncomment the line below to use localStorage
        // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
    },

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
                  <div class="thumb"
                      style="background-image: url('${song.image}')">
                  </div>
                  <div class="body">
                      <h3 class="title">${song.name}</h3>
                      <p class="author">${song.singer}</p>
                  </div>
                  <div class="option">
                      <i class="fas fa-ellipsis-h"></i>
                  </div>
              </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function () {

        const cdWidth = cd.offsetWidth

        // xử lý CD  quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // xử lý scrooll
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };

        // xử lý play
        playBtn.onclick = function () {
            if (app.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // khi song  được play
        audio.onplay = function () {
            app.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        audio.onpause = function () {
            app.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // khi bài hát chạy
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
            // xử lý khi tua song
            progress.onchange = function (e) {
                const seekTime = audio.duration / 100 * e.target.value
                audio.currentTime = seekTime
            }
        }

        // xử lý btn next
        nextBtn.onclick = function () {
            if (app.isRandom) {
                app.playRandomSong()
            } else {
                app.nextSong()
            }
            audio.play()
            app.render()
            app.scrollToActiveSong()
        }

        // xử lý btn prev
        prevBtn.onclick = function () {
            if (app.isRandom) {
                app.playRandomSong()
            } else {
                app.prevSong()
            }
            audio.play()
            app.render()
            app.scrollToActiveSong()
        }

        // xử lý random
        randomBtn.onclick = function (e) {
            app.isRandom = !app.isRandom
            app.setConfig('isRandom', app.isRandom)
            randomBtn.classList.toggle('active', app.isRandom)
        }

        // xử lý phát lại  song
        repeatBtn.onclick = function (e) {
            app.isRepeat = !app.isRepeat
            app.setConfig('isRepeat', app.isRepeat)
            repeatBtn.classList.toggle('active', app.isRepeat)
        }

        //  xử lý next song khi audio ended
        audio.onended = function () {
            if (app.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // lắng nghe hành vi cick vào playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active')

            if (songNode || e.target.closest('.option')) {
                // xử lý khi cllick vào song
                if (songNode) {
                    app.currentIndex = Number(songNode.dataset.index)
                    app.loadCurrentSong()
                    app.render()
                    audio.play()
                }
            }
        }
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        }, 300);
    },
    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },

    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    start: function () {

        this.loadConfig()

        // định  nghĩathuoc65 tính cho  object
        this.defineProperties()

        // lắng nghe xử lý sự kiện
        this.handleEvents()

        // Tải tông tin bài hát đầu tiênn khi chạy ứng dụng
        this.loadCurrentSong()

        // render playlist
        this.render()

        // hiển thị trạng thái ban đầu cảu button repeat và random
        // randomBtn.classList.toggle('active', this.isRandom)
        // repeatBtn.classList.toggle('active', this.isRepeat)
    }


}

app.start()