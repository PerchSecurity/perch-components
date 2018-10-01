# ActionBar

Component for displaying a list of actions as buttons to the user.

Used primarily in BaseTable for multiselect.

## Usage

```jsx
const actions = [
  {
    danger: true,
    icon: 'delete',
    label: 'Delete All Items',
    onClick: deleteItems
  },
  {
    icon: 'save',
    label: 'Save All Items',
    onClick: saveItems
  }
];

<ActionBar actions={actions} items={4} />
```

## API

### Props

- `actions: Array<Object>` - Props to pass to individual [ActionButton](./ActionButton.md)s
- `items: Number` - Number of items to display as "selected" next to the actions
