import program from './data.js'
import runProgram from '../intCodeFunctions.js'
import Resource from '../SharedResource.js'
import { permutations, flatArray } from '../helpers.js'

function* inputsGenerator(int, signal) {
  const inputArray = [int, signal]
  for (const input of inputArray) yield input
}

// Part 1

async function executeSequence(program, sequence) {
  let signal = 0
  for (const int of sequence) {
    const inputs = inputsGenerator(int, signal)

    await runProgram(
      program,
      () => inputs.next().value,
      sig => (signal = sig),
    )
  }
  return signal
}

async function findMaxSignal(program) {
  let maxSignal = 0
  let maxSequence
  for (const sequence of permutations([0, 1, 2, 3, 4])) {
    const signal = await executeSequence(program, sequence)
    if (signal > maxSignal) {
      maxSequence = sequence
      maxSignal = signal
    }
  }
  return [maxSignal, maxSequence]
}

//Part 2

async function findMaxSignalLoop(program) {
  let maxSignal = 0
  let maxSequence
  for (const sequence of permutations([5, 6, 7, 8, 9])) {
    const resources = (await executeSequenceLoop(program, sequence)).map(
      ({ data }) => data,
    )
    const signal = flatArray(resources).find(x => x)
    if (signal > maxSignal) {
      maxSequence = sequence
      maxSignal = signal
    }
  }

  return [maxSignal, maxSequence]
}

async function executeSequenceLoop(program, sequence) {
  const resources = sequence.map((int, index) => {
    const resource = new Resource(`Buffer ${index}`)
    resource.write(int)
    if (index === 0) resource.write(0)
    return resource
  })

  const threads = sequence.map((int, index) => {
    const next = (index + 1) % 5
    return runProgram(program, resources[index].read, resources[next].write)
  })

  await Promise.all(threads)
  return resources
}

export const part1 = async () => (await findMaxSignal(program))[0]
export const part2 = async () => (await findMaxSignalLoop(program))[0]
