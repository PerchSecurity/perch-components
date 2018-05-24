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

<ActionBar actions={actions} text="4 items selected" />
```

## API

### Props

- `actions: Array<Object>` - Props to pass to individual [ActionButton](./ActionButton)s
- `title: String` - text to display to the left of the actions
