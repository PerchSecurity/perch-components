# Changelog

## 0.10.0

- Add default UI for a noResults state
- Add renderError and renderNoResults for customization of states

## 0.9.3

- Remove `type=search` for cross-browser consistency

## 0.9.2

- Clear selections after multiselect action is triggered

## 0.9.1

- Fix null vs undefined sort props

## 0.9.0

- BREAKING: Change the child function signature for AutoTable
- Add multiselect support to AutoTable and BaseTable
- Change MUI peer dependency requirement
- Add clear button to SearchBar
- Add ActionButton and ActionBar

## 0.8.2

- Update perch-data to v0.19.1 (prevent out-of-order renders with successive refetches)

## 0.8.1

- Update perch-data to v0.19.0

## 0.8.0

- Add optional forceSubmit prop to SaveButton
- Add support for multiSelect and non-native selects to MaterialInputSelect
- Add checkbox option for MaterialInputBoolean
- Fix falsy values in form fields

## 0.7.2

- Update perch-data to v0.17.1

## 0.7.1

- Update perch-data to v0.17.0

## 0.7.0

- Replace AutoTable's second arg (`refetch`) with an arg "bag" like Formik
- Update perch-data to v0.16.1

## 0.6.0

- Updates for MUI beta v30-44

## 0.5.2

- Update perch-data to v0.15.1
- Pass `refetch` as optional second argument to AutoTable

## 0.5.1

- Force loading state to take priority over stale data
- Optimistically update the UI when changing table props
- Set search debounce to 1s (previously 300ms)

## 0.5.0

- [Breaking] Rename `paginatable` to `pageable`
- Add logic to clear page and sort when AutoTable filters/search change
- Add polyfill for React 16.3 lifecycle methods

## 0.4.0

- [Breaking] Removed `maxRows` and `size` from AutoTable
- Upgraded to React 16
- Addeed configurable rowsPerPage to AutoTable/Basetable

## 0.3.0

- Add support for hiding columns in Auto/BaseTable via the [MUI Hidden Component](https://material-ui-next.com/api/hidden/).
- Fix a header padding issue with AutoTable

## 0.2.0

- Upgrade to perch-data v0.12.0 [ Breaking: Now uses a Provider ]
- Fix all lint errors
- Upgrade dependencies

## 0.1.0

- Initial release
