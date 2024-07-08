
# Project Overview

Hi there! 👋 Welcome to my project, developed with the primary goal of learning and enhancing my skills. I didn't set any specific expectations for this project other than personal growth and skill improvement. 

I hope it's helpful for anyone looking or building something like this.

### This is an example integration. Floating-chatbot-widget to HTML

![Local Image](https://github.com/jakkapan1789/Floating-chatbot-widget/blob/main/example.png)
```html
<!DOCTYPE  html>
<html  lang="en">
<head>
     <meta  charset="UTF-8">
     <meta  name="viewport"  content="width=device-width, initial-scale=1.0">
     <title>Form HTML</title>
     <link  rel="stylesheet"  href="./style.css">
</head>
<body>
     <div  class="container">
</body>
<script  src="./script.js"></script>
<script>
     agent.init({
       name:"ChatBot",
       profileImg:`https://example/avatar.png`
});
</script>

</html>
```


| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The name of the agent. |
| `srcImage` | `string` | The URL of the agent's image. |
| `widgetPosition` | `object` | The position and styling of the agent's widget. |
| `widgetPosition.bottom` | `string` | The distance from the bottom of the screen (e.g., "30px"). |
| `widgetPosition.right` | `string` | The distance from the right side of the screen (e.g., "30px"). |
| `widgetPosition.borderRadius` | `string` | The border radius of the agent's widget (e.g., "25%"). |
| `widgetPosition.zIndex` | `number` | The z-index of the agent's widget (e.g., 10000). |
| `customChatTab` | `object` | The custom styling of the agent's chat tab. |
| `customChatTab.bgColor` | `object` | The background color gradient of the chat tab. |
| `customChatTab.bgColor.to` | `string` | The direction of the gradient (e.g., "left"). |
| `customChatTab.bgColor.firstColor` | `string` | The first color of the gradient (e.g., "#0077b6"). |
| `customChatTab.bgColor.secondColor` | `string` | The second color of the gradient (e.g., "#00a8e8"). |


### All scripts use Floating-chatbot-widget

```javascript
agent.init({
  name: "John Doe",
  srcImage: "https://example.com/avatar.jpg",
  widgetPosition: {
    bottom: "30px",
    right: "30px",
    borderRadius: "25%",
    zIndex: 10000,
  },
  customChatTab: {
    bgColor: {
      to: "left",
      firstColor: "#0077b6",
      secondColor: "#00a8e8",
    },
  },
});

```



