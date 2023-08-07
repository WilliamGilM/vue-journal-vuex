

export default () => ({
  isLoading: true,
  entries: [
    {
      id: new Date().getTime(),
      date: new Date().toDateString(),
      text: 'Ex reprehenderit incididunt in officia incididunt voluptate incididunt.',
      picture: null,
    },
    {
      id: new Date().getTime() + 1000,
      date: new Date().toDateString(),
      text: 'Duis pariatur exercitation ad do sunt ut commodo nostrud aute commodo esse qui laboris.',
      picture: null,
    },
    {
      id: new Date().getTime() + 2000,
      date: new Date().toDateString(),
      text: 'Irure nisi dolor sint commodo.',
      picture: null,
    },
  ]
})