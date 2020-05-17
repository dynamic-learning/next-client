const add = (a:number,b:number) => {
    return a+b
}

test('should return false given external link', () => {
    expect(add(3,2)).toBe(5)
})