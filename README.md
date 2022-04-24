## Mail template render
A simple way to render email templates, initially for ejs

### Example of template
```html

   <b>
      <%= a %>
   </b>
```

### Example of context
```json
{
   "a" : 1
}
```


### todo
- Custom json platform validate
- Validate req
- Unit Test
- Improve docs
- Improve content validation 
- Alert Message to block character **`** or **'** in context JSON input 
- Validate pug and other template engine
