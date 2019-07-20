<template>
  <div id="posts-view">

    <nav>
      <button :disabled="pageNumber === 1" @click="prevPage" class="pagi-link">Предыдущая страница</button>
      <div class="pagi-pages">
        <span v-for="page in pages"
              v-bind:key="page.id"
              @click="changePage(page)" :class="{ active: pageNumber == page }"
              class="pagi-number">{{ page }}</span>
      </div>
      <button :disabled="pageNumber >= pageCount" @click="nextPage" class="pagi-link">Следующая страница</button>
    </nav>

    <div class="posts-wrapper">
      <div v-for="post in paginatedData" v-bind:key="post.id" class="post">
        <h3 class="post-title">{{ post.title }}</h3>
        <div class="post-info">{{ formatDate(post.publishDate) }}</div>
        <div class="post-text">
          <p>{{ post.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'posts-view',

  props: {
      postsData:{
          type:Array,
          required:true
      },
      size:{
          type:Number,
          required:false,
          default: 3
      },
      pageRange: {
        type: Number,
        required:false,
        default: 1
      }
  },

  data() {
      return {
          pageNumber: 1,
      }
  },

  computed: {
      pageCount(){
          let l = this.postsData.length, s = this.size;
          return Math.ceil(l/s);
      },
      paginatedData(){
          const start = (this.pageNumber - 1) * this.size, end = start + this.size;
          return this.postsData.slice(start, end);
      },
      startRange() {
        let count = this.pageNumber - this.pageRange;
        return count > 0 ? count : 1;
      },
      endRange() {
        let count = this.pageNumber + this.pageRange;
        return count < this.pageCount ? count : this.pageCount;
      },
      pages() {
        let pages = [];
        for (let i = this.startRange; i <= this.endRange; i++) {
          pages.push(i);
        }
        return pages;
      }
  },

  methods: {
      nextPage() {
          this.pageNumber++;
      },

      prevPage() {
          this.pageNumber--;
      },

      changePage(page) {
        this.pageNumber = page;
      },

    // функция для форматирования даты
      formatDate(date) {
          let dd = String(date.getDate()).padStart(2, '0');
          let mm = String(date.getMonth() + 1).padStart(2, '0');
          let yyyy = date.getFullYear();

          return `${dd}.${mm}.${yyyy}`;
      },
  }


}
</script>

<style lang="scss" scoped>

@import './src/css-parts/_variables.scss';


nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px auto;
}

.pagi-number {
  border: 1px solid $colorForPlaceholders;
  border-radius: 2px;
  padding: 2px 6px;
  margin: 0 4px;
  font-size: 13px;
  font-family: $fontFamilyForServiceText;
  color: $colorForText;
  cursor: pointer;
  transition: all ease-in-out .2s;

  &:hover {
    background-color: $blue;
    border-color: $darkBlue;
    color: white;
  }

}

.active {
    background-color: $blue;
    border-color: $darkBlue;
    color: white;
    cursor: default;
}

.pagi-link {
  font-family: $fontFamilyForServiceText;
  font-size: 14px;
  text-decoration: none;
  color: $blue;
  transition: all ease-in-out .2s;
  border: none;
  border-bottom: 1px solid transparent;
  background-color: transparent;
    outline: none;

  &:hover {
    color: $darkBlue;
    border-bottom: 1px solid;
    cursor: pointer;
  }

}

.posts-wrapper {
  margin: 20px auto;
}

.post {
  padding-bottom: 28px;
  margin-bottom: 40px;
  border-bottom: 1px solid $colorForBlueShadows;
}

.post-title {
  font-family: $fontFamilyForTitle;
  font-size: 16px;
  color: $blue;
  margin-bottom: 8px;
}

.post-info {
  font-family: $fontFamilyForServiceText;
  font-size: 13px;
  color: $colorForPlaceholders;
  margin-bottom: 12px;
}

.post-text {
  font-family: $fontFamilyForText;
  font-size: 14px;
  color: $colorForText;
}

</style>