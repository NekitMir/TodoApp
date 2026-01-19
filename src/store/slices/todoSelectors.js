import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredTodos = (debouncedSearchValue) => createSelector(
  [
    (state) => state.todos.todos,
    (state) => state.todos.sortOrder
  ],
  (todos, searchValue, sortOredr) => {
    const filtered = todos.filter((todo) => todo.title.toLowerCase().includes(debouncedSearchValue.toLowerCase()))

    if(sortOredr === 'none') {
      return filtered
    }

    return [...filtered].sort((a, b) => {
      const titleA = a.title.toLowerCase()
      const titleB = b.title.toLowerCase()

      return sortOredr === 'asc'
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA)
    })
  }
)