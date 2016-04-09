## React Commit Calendar

### To Checkout

* * *
Just Github commit calendar clone. See
[Demo](http://groupystinks.com/react-commit-calendar/)

### To Start

* * *

```
npm install react-commit-calendar --save
```

### To Use

* * *

```
import CommitCalendar from 'react-commit-calendar';

ReactDOM.render(
  <CommitCalendar
    dataset={dataset}
  />
, mountNode);
```

#### dataset format

```
var dataset = {
  '2016-03-18': {
    count: 4,
    sources: [
      { uri: 'https://gorupystinks.com', count: 2, name: 'groupystinks.com' },
      { uri: 'https://github.com/groupystinks', count: 2, name: 'github' }
    ]
  },
  '2016-03-19': {
    count: 60,
    sources: [
      { uri: 'https://twitter.com/groupystinks', count: 20, name: 'twitter' },
      { uri: 'https://gorupystinks.com', count: 30, name: 'groupystinks.com' },
      { uri: 'https://github.com/groupystinks', count: 10, name: 'github' }
    ]
  }
};
```

### Configurable Config

* * *

- dataset: PropTypes.object.isRequired,
- colors: PropTypes.array,

  ```
  colors = ['#ffff00', '#e5e500', '#cccc00', '#b2b200']
  ```
  Colors provided as above will be render as 5 levels (including '#eee') color
  scale to represent contribution's intensity.

- marginBottom: PropTypes.number,
- marginLeft: PropTypes.number,
- marginRight: PropTypes.number,
- marginTop: PropTypes.number,

- width: PropTypes.number,
- height: PropTypes.number,

- unit: PropTypes.string,

### To Develop

* * *

fork it

```
npm install
npm run dev
```
