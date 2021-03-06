export const intToArray = int =>
  pipe(
    i => i.toString(),
    s => [...s],
    a => a.map(char => parseInt(char)),
  )(int)

export const permutations = inputArr => {
  const result = []

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice()
        const next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result
}

export const flatArray = array => [].concat.apply([], array)

export const logDayResults = async ({ part1, part2 }, day) =>
  console.log(`Day ${day}`) ||
  console.log(`Part 1: ${await part1()}`) ||
  console.log(`Part 2: ${await part2()}`) ||
  console.log()

export function pipe(...args) {
  return input => args.reduce((lastValue, fn) => fn(lastValue), input)
}
