import { test, describe } from 'node:test'
import assert from 'node:assert'
import listHelper from '../utils/list_helper.js'

describe('total likes', () => {
  test('with empty list', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test('with 6 entries', () => {
    const blogs = [
      {
        likes: 0
      },
      {
        likes: 1
      },
      {
        likes: 2
      },
      {
        likes: 3
      },
      {
        likes: 4
      },
      {
        likes: 5
      }
    ]

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 15)
  })

  test('with 1 entry', () => {
    const blogs = [
      {
        likes: 15500
      }
    ]

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 15500)
  })

  test('with negative likes', () => {
    const blogs = [
      {
        likes: -30
      },
      {
        likes: 1
      }
    ]

    assert.throws(() => {
      listHelper.totalLikes(blogs)
    })
  })

  test('with floating point likes', () => {
    const blogs = [
      {
        likes: 2.5
      },
      {
        likes: 3.5
      }
    ]

    assert.throws(() => {
      listHelper.totalLikes(blogs)
    })
  })

  test('with non-numeric likes', () => {
    const blogs = [
      {
        likes: 'one'
      },
      {
        likes: true
      }
    ]

    assert.throws(() => {
      listHelper.totalLikes(blogs)
    })
  })

  test('with a non-array input', () => {
    assert.throws(() => {
      listHelper.totalLikes('HELLO')
    })
  })
})
