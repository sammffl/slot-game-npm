# slot-game-npm
创建老虎机插件

npm install slot-game-js

```sass
$itemWidth: 100;

#slot-game {
    width: rem($itemWidth*3);
    height: rem($itemWidth*2);
    background-color: aliceblue;
    @include prefixv(display, flex);
    @include prefix(flex-flow, row wrap);
    @include prefix(justify-content, center);

    position: absolute;
    top: 50%;
    left: 50%;
    @include prefix(transform, translate(-50%, -50%));

    .content {
        @include prefix(flex, 1);
        overflow: hidden;
        position: relative;

        > ul {
            position: absolute;
            top: rem(-$itemWidth/2);
        }

        .slot-icon {
            width: rem($itemWidth);
            height: rem($itemWidth);
            line-height: rem($itemWidth);
            text-align: center;
        }

        //.slot-icon-1 {
        //    @include bg('../images/apple.png', 100);
        //}
        //.slot-icon-2 {
        //    @include bg('../images/diamond.png', 100);
        //}
        //.slot-icon-3 {
        //    @include bg('../images/coin.png', 100);
        //}
        //.slot-icon-4 {
        //    @include bg('../images/banana.png', 100);
        //}
        //.slot-icon-5 {
        //    @include bg('../images/watermelon.png', 100);
        //}
    }
}
```
