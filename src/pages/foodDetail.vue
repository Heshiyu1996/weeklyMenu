<template>
  <div class="videoDetail">
    <div class="video-wrapper">
      <!-- <swiper loop auto
        class="player"
        :list="data_list"
        :index="idx"
        @on-index-change="onIndexChange"
      ></swiper> -->
    </div>
		<img ref="vidBgImg" class="vidBgImg" src="https://static.vux.li/demo/2.jpg" />		
		<img class="shadeBg"/>
    <div ref="content" class="content" >
			<div class="vidHeader">
				<div class="name f-ellipsis2">{{ foodInfo.name }}</div>
        <Cell>
          <rater disabled v-model="data6" active-color="rgb(255, 153, 0)"></rater>
        </Cell>
				<div class="desc">{{ foodInfo.intro }}</div>
        <div class="tags">
          <div class="tag">浙菜</div>
          <div class="tag">酸甜</div>
          <div class="tag">开胃</div>
        </div>
			</div>
			<div class="vidLine"></div>
			<div class="vidBody">
				<ul class="chineseContent" v-html="foodInfo.content"></ul>
			</div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'test',
    data () {
        return {
            foodInfo: {
                imageUrl: '',
                name: '糖醋里脊',
                intro: '以猪里脊肉为主材，配以面粉，淀粉，醋等作料，酸甜可口，让人食欲大开。在浙菜、鲁菜、川菜、淮扬菜、粤菜里均有此菜。',
                content: '<li>主要食材： 里脊肉，淀粉，面粉，糖醋</li><li>主要调料：香油，高汤，料酒，白糖，精盐。</li>'
            },
            data_list: [{
                url: 'javascript:',
                img: 'https://static.vux.li/demo/1.jpg'
            }, {
                url: 'javascript:',
                img: 'https://static.vux.li/demo/2.jpg'
            }, {
                url: 'javascript:',
                img: 'https://static.vux.li/demo/3.jpg'
            }],
            idx: 0,
            data6: 4
        }
    },
    methods: {
        onIndexChange (index) {
            this.idx = index
        }
    },
    watch: {
        '$route': 'getArticleDetail'
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/postcss" scoped>
@import "../common.css";

.videoDetail {
    width: 100%;

    .video-wrapper {
        position: relative;
        z-index: 5;
        height: px2rem(189px);

        .player {
            position: fixed;
            width: 100%;
            height: px2rem(189px);
            z-index: 1;

            .vux-swiper {
                height: px2rem(189px) !important;
            }
        }
    }

    .vidBgImg, .shadeBg {
        width: 100%;
        height: 100%;
        position: fixed;
        object-fit: cover;
        background-repeat: no-repeat;
    }

    .vidBgImg {
        filter: blur(25px);
        -webkit-filter: blur(25px);
        transform: scale(1.3, 1.3);
    }

    .shadeBg {
        background-color: $black;
        opacity: .4;
    }

    .content {
        opacity: .999;
        padding: px2rem(16px) px2rem(19px) px2rem(16px) px2rem(21px);

        .vidHeader {
            color: $white;

            .name {
                display: inline-block;
                max-width: px2rem(240px);
                max-height: px2rem(55px);
                font-family: PingFang-SC-Medium;
                font-size: px2rem(18px);
                color: $white;
            }

            .weui-cell {
                position: absolute;
                right: px2rem(19px);
                display: inline-block;
                max-width: px2rem(85px);
                padding: 0;

                &:before {
                    border-top: 0 solid $white;
                }

                .vux-rater a {
                    font-size: px2rem(14px) !important;
                    width: px2rem(14px) !important;
                    margin-right: px2rem(3px) !important;
                }
            }

            .desc {
                opacity: .6;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                margin-top: px2rem(10px);
            }

            .tags {
                width: 100%;
                margin: px2rem(14px) 0 0 0;
                position: relative;

                .tag {
                    display: inline-block;
                    text-align: center;
                    background: linear-gradient(90deg, rgb(255, 94, 58), rgb(255, 149, 0));
                    border-radius: px2rem(2px);
                    width: px2rem(36px);
                    font-size: px2rem(12px);
                }

                .tag:nth-child()n {
                    display: inline-block;
                    text-align: center;
                    background: linear-gradient(90deg, rgb(255, 94, 58), rgb(255, 149, 0));
                    border-radius: px2rem(2px);
                    width: px2rem(36px);
                    font-size: px2rem(12px);
                }
            }
        }

        .vidLine {
            height: px2rem(1px);
            opacity: .2;
            background: $white;
            margin: px2rem(15px) px2rem(0)2rem(16px) px2rem(0);
        }

        .vidBody {
            ul > li {
                list-style: none;
                font-family: PingFangSC-Regular;
                font-size: px2rem(12px);
                color: $white;
                line-height: px2rem(18px);
                text-indent: 2em;
                margin-top: px2rem(14px);
            }

            ul > li:first-child {
                margin-top: 0;
            }
        }
    }
}
</style>
