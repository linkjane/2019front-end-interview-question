var clock = function* (arg) {
    let result = yield arg + 1;

    yield result + 100;
};

let result = clock(1);
console.log(result.next());
console.log(result.next(4));