# dialog-box

Popup dialog for displaying information.

```bash
npm install @bgoodman/dialog-box

yarn add @bgoodman/dialog-box
```

## Usage

```html
<!DOCTYPE html>
<html>
<head>
	<title>dialog-box</title>
	<script type="module" src="./dist/index.js"></script>
</head>

<body>
	<dialog-box open="true" confirm-lbl="Continue">
		<div slot="dialog-title">
			Title Heading
		</div>
		<div slot="dialog-content">
			Hello, test test test
			blah
		</div>
	</dialog-box>
</body>


</html>
```

## Attributes

### `open` (boolean)

The dialog is visible when `true`.  May also be set via the element property `open`.

### `close-on-confirm` (boolean)

If true, the dialog will close when the default confirmation button is clicked.  Default `true`.

### `confirm-btn` (boolean)

If true, the default confirmation button will be rendered.  Default `true`.

### `confirm-lbl` (string)

Override the default confirmation button label.  Default `"OK"`.

### `cancel-btn` (boolean)

If true, the default cancellation button will be rendered.  Default `true`.

### `cancel-lbl` (string)

Override the default cancellation button label.  Default `"Cancel"`.

## Events

### `"confirmed"`

Emitted on click of default confirmation button.

### `"cancelled"`

Emitted on click of default cancel button.