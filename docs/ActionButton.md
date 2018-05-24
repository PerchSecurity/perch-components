# ActionButton

Component for displaying an action as a button.

Used primarily in ActionBar.

## Usage

```jsx
const deleteItems = (items) => deleteItemsFromAPI({ items });

<ActionButton
  danger
  icon='delete',
  label='Delete All Items',
  onClick={deleteItems}
/>
```

## API

### Props

- `danger: Boolean` - Changes the styling to be red and scary
- `icon: String OR Element` - Renders an MUI Icon or provided component
- `label: String` - The label for a text-based button or tooltip for an icon button
- `onClick: Function` - Function called when clicked - BaseTable hijacks this to pass `items`
- `link: String OR Object` - Passed to ReactRouter's Link component as `to`

### onClick

BaseTable overwrites the onClick event to pass in the selected items in the table. You can do this anywhere by simply overwriting the prop, or, in ActionBar-style usage, accept an `action` as an object and wrapping the onClick event and spreading the action to the ActionButton component.

```jsx
const { action, items } = this.props;

/* action = {
  danger: true,
  icon: 'delete',
  label: 'Delete All Items',
  onClick: deleteItemsFromAPI
};
items = [ 1, 2, 3 ]; */

action.onClick = () => action.onClick(items);

<ActionButton {...action} />
```
