import { intToArray } from '../helpers.js'

const raw = '197487-673251'
const [bottom, top] = raw.split('-').map(x => parseInt(x))

function normalizeUp(integer) {
  const intArray = intToArray(integer)
  let current = 0
  intArray.forEach((int, index) => {
    if (int < current) intArray[index] = current
    else current = int
  })
  return intArray
}

function normalizeDown(integer) {
  const intArray = intToArray(integer)
  let current = 0
  for (let i = 0; i < intArray.length; i++) {
    if (intArray[i] < current) {
      intArray[i - 1] = intArray[i - 1] - 1
      for (; i < intArray.length; i++) {
        intArray[i] = 9
      }
      current = 0
      i = -1
    } else current = intArray[i]
  }
  return intArray
}

function getInt(intArray) {
  return parseInt(intArray.join(''))
}

function hasConsecutive(intArray) {
  let previous = NaN
  for (const int of intArray) {
    if (int === previous) return true
    previous = int
  }
  return false
}

function hasConsecutivePart2(intArray) {
  for (let i = 0; i < intArray.length; i++) {
    const equalsPrevious = intArray[i - 1] && intArray[i - 1] === intArray[i]
    const equalsNext = intArray[i + 1] && intArray[i + 1] === intArray[i]
    const equalsNextNext = intArray[i + 2] && intArray[i + 2] === intArray[i]

    if (!equalsPrevious && equalsNext && !equalsNextNext) return true
  }
  return false
}

// Part 1

export function part1() {
  const topInt = getInt(normalizeDown(top))

  let validPasswords = 0
  let current = normalizeUp(bottom)

  for (;;) {
    const currentInt = getInt(current)
    if (currentInt > topInt) break
    if (hasConsecutive(current)) validPasswords++
    current = normalizeUp(1 + currentInt)
  }
  return validPasswords
}

// Part 2
export function part2() {
  const topInt = getInt(normalizeDown(top))

  let validPasswords = 0
  let current = normalizeUp(bottom)

  for (;;) {
    const currentInt = getInt(current)
    if (currentInt > topInt) break
    if (hasConsecutivePart2(current)) validPasswords++
    current = normalizeUp(1 + currentInt)
  }
  return validPasswords
}
