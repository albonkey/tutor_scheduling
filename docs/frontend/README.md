# Frontend

## Creating React Components
Each component should have its own folder. The structure should be

Folder Name:
`MyComponent`

The files inside the folder:
`MyComponent.js`
`MyComponent.scss`

#### Here is an example on a React Component for our web application.

This component has a lot of useful functionalities that you might need when you create your own components.

```js
import React, { useState } from 'react';
import style from './MyComponent.module.scss';

const MyComponent = ({isTeaching, subject, name, time}) => {
	const [isSelected, setIsSelected] = useState(false);

	return(
    <div
      className={
         [
           style.wrapper,
           isTeaching && style.teaching,
           isSelected && style.selected
         ].join(' ')
       }
       onClick={() => setIsSelected(!isSelected)}
     >
     <div className={style.info}>
       <span className={style.status}>
         {
           isTeaching ? 'Teaching' : 'Learning'
         }
       </span>
       <span>{`${subject} with ${name}`}</span>
      </div>
      <div className={style.info}>
        <a className={style.link}>View Session</a>
        <span>{time}</span>
      </div>
     </div>
   )
}
export default MyComponent;

```
## Styling with Sass/ CSS
Sass is an extension of CSS that adds power and elegance to the basic language. In this project we're using `variables` and `mixins` to create coherence across our project and making it easier to write responsive components.

[Sass Documentation](https://sass-lang.com/documentation/)

[Style Guide for Sass](https://sass-guidelin.es/)

Remember to import the `variables` and `mixins` in your `.scss` file. At the top of your file include the following lines:

```scss
@import "../../styles/abstracts/_mixins.scss";
@import "../../styles/abstracts/_variables.scss";
```

### Variables
Variables allow us to reuse values without having to copy them over and over again. Most importantly, they make updating a value very easy.

| Variable | Function     |
| -------- | ------------ |
| $font1   | Primary Font |


Example:
```scss
  .myComponent{
    font-family: $font1;
  }
```

#### Colors
Use the function `color(color, tone)` to access our different colors.

We have the following colors:

| color     | base               | lighter            | darker |
|-----------|--------------------|--------------------|--------|
| primary   | :heavy_check_mark: |                    |        |
| secondary | :heavy_check_mark: | :heavy_check_mark: |        |
| accent    | :heavy_check_mark: |                    |        |
| success   | :heavy_check_mark: | :heavy_check_mark: |        |
| warning   | :heavy_check_mark: | :heavy_check_mark: |        |
| error     | :heavy_check_mark: | :heavy_check_mark: |        |

Example:

```scss
  .myComponent{
    background-color: color(primary, base);
    color: color(secondary. lighter);
  }

```


### Mixins
Mixins are one of the most used features from the whole Sass language. They are the key to reusability and DRY components. And for good reason: mixins allow authors to define styles that can be reused throughout the stylesheet without needing to resort to non-semantic classes such as `.float-left`

#### Under you can see an example of using a mixin:
```scss
  @mixin myMixin{
    font-size: 3rem;
    font-weight: bold;
  }

  .myComponent{
    @include myMixin;
  }
```

#### Mixins for this project
| Mixin              | Use Case                                                                                                               |
|--------------------|------------------------------------------------------------------------------------------------------------------------|
| headerBig          | Used for bigger headers                                                                                                |
| text              | Used for normal text                                                                                                   |
| smallText          | Used for small text                                                                                                    |
| flexCenter         | Used for centering things in a element with flex                                                                       |
| component          | Used to add rounded corners, padding and drop shadow to an element                                                     |
| breakpoint($point) | Used to add breakpoints for different screen sizes. Parameters: `desktop`, `laptop`, `tablet`, `phablet`, `mobileonly` |

## Design

### Homepage
![](https://github.com/albonkey/tutor_scheduling/blob/master/docs/images/Home.png)

### Profile
![](https://github.com/albonkey/tutor_scheduling/blob/master/docs/images/Profile.png)

### Sessions
![](https://github.com/albonkey/tutor_scheduling/blob/master/docs/images/Sessions.png)

### Discovery
![](https://github.com/albonkey/tutor_scheduling/blob/master/docs/images/Discovery.png)

### Settings
![](https://github.com/albonkey/tutor_scheduling/blob/master/docs/images/Settings.png)
