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

The element's class constructor can also be used.

```typescript
constructor DialogBox(opts?: {
    title?: string | undefined;
    content?: string | undefined;
    confirmBtn?: {
        include?: boolean | undefined;
        lbl?: string | undefined;
    } | undefined;
    cancelBtn?: {
        include?: boolean | undefined;
        lbl?: string | undefined;
    } | undefined;
    closeOnConfirm?: boolean | undefined;
} | undefined): DialogBox
```

```html
<script type="module">
    import DialogBox from "./dist/index.js";
    const dialogBox = new DialogBox({title: "Test Title", content: "Test content"});
    document.querySelector("body").appendChild(dialogBox);
    dialogBox.open = true;
    dialogBox.addEventListener("confirmed", (e) => console.log(e))
    dialogBox.addEventListener("cancelled", (e) => console.log(e))
</script>
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

---

## Properties

### `dialogTitle`

Gets the current title or can be set to a new value;

### `dialogContent`

Gets the current content or can be set to a new value;

---

## Events

### `"confirmed"`

Emitted on click of default confirmation button.

### `"cancelled"`

Emitted on click of default cancel button.
