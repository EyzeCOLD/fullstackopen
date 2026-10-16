const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (!Array.isArray(blogs)) {
    throw new Error('parameter blogs must be an array')
  }

  return blogs.reduce((total, current) => {
    if (!Number.isInteger(current.likes))
      throw new Error('Likes is not an integer')
    if (current.likes < 0)
      throw new Error('Likes cannot be negative')
    return total + current.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (!Array.isArray(blogs))
    throw new Error('parameter blogs must be an array')

  if (blogs.length === 0)
    throw new Error('parameter blogs cannot be empty')

  return blogs.reduce((favorite, current) =>
    current.likes > favorite.likes ? current : favorite)
}

export default { dummy, totalLikes, favoriteBlog }
