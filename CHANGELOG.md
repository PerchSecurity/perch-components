# Changelog

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
