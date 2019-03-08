let arr = [1, 2, 3, 4, 5, 6, 7];
arr = [7, 6, 5, 4, 3, 2, 1];
arr = [7, 1, 5, 4, 8, 3, 1, 10];
arr = [7, 1, 2, 3, 4, 5, 6, 7];

//先是两者比较, 如果第一大于第二, 再比较第二和第三,
//如果第一小于第二, 设置最小第一, 然后 比较第二和第三, 如果第二大于第三, 就用第二减去第一, 如果第二小与第三, 再以此类推比较

//第一种情况 , 如果i<第i +1 , 如果第i + 1<第 i + 2, 如果第三<第四 .... 如果第n-1 < 第n  ----> n - i   @1
//第二种情况, if i > i + 1, if i + 1 > i + 2 ..... if n - 1 > n  -----> 0    @2
//第三种情况, if i < i + 1, if i + 1 > i + 2 ----> i + 1 - i --> 继续@1或者@2或第三, 最终全部profit相加

let low = arr[0];
let high = arr[0];
let profit = 0;

let state = false;

function maxStockProfit() {
    for (let i = 0; i < arr.length - 1; i++) {

        if (arr[i] < arr[i + 1] ) {
            if (arr.length - i === 2) {
                profit += arr[i + 1] - arr[i];
            } else  if (arr[i + 1] < arr[i + 2]) {
                high = arr[i + 2];
            } else  if (arr[i + 1] > arr[i + 2]) {
                state = true;
                profit += arr[i + 1] - arr[i];
            }

            if (arr[i] < low) {
                low = arr[i];
            }

        }
    }
    if (state === false) {
        profit = high - low;
    }
}
maxStockProfit();
console.log(profit);



