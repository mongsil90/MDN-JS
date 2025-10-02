
function jack(x, y, z) {
    const a = x;
    const o = y;
    const b = z;
    return {a, o, b};
}

const wow = jack(100, "v", "a");

const {x, y, z} = wow;

console.log(wow);