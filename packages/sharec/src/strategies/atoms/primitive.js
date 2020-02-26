function primitiveAtom({ current, upcoming, cached }) {
  if (current && !upcoming) return current
  if (!current && upcoming) return upcoming
  if (cached && current !== cached) return current
  if (current !== upcoming) return upcoming

  return current
}

module.exports = primitiveAtom
