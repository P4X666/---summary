function test_push(a,b,c) {
    console.log(arguments)
    Array.prototype.push.call(arguments,4)
    console.log(arguments,1)
}
test_push(1,2,3)