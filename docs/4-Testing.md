# Testing

(Currently frontend only)

## General

We are using Jest and `@testing-library/react` for unit tests. You can run all tests with `yarn test`.
Before each commit, you should check the code coverage with `yarn test --coverage`
You'll find the test suit setup in `config/test`.

## What to test

We try to test what's important for the user. Our testing library (`@testing-library/react`) supports this approach.
E.g. when testing the navigation, we could test, if the nav items are getting rendered and if they redirect the user to the new route, on click.
This would look like:

```
  const { getByText } = render(<Navigation/>)
  expect(getByText('Settings')).toBeinTheDocument()
```

## Writing unit tests

How to write component tests (in this example a form component).
Have a look at the existing tests, for more detailed examples regarding the described scenarios.

1. Render the component
   `const { getByText, getByLabelText } = render(<FormComponent handleSubmit={submitStub}/>)`
   If you need access to the router / theme or the apollo provider, have a look at the testUtils file (especially `renderWithAppRoot()`).
2. If needed, interact with the component, for example by fillign out an input:
   `fireEvent.click(getByText('Erstellen'), leftClickOption)`
   or by clicking on a button:
   ```
    fireEvent.change(getByLabelText('Einheit'), {
      target: { value: categoryCreate.unit },
    })
   ```
   Its important to know, when testing (or mocking) an async action,
   like fetching and submiting data, use an `async test(): Promise<void> {}` function
   in combination with `await wait()`.
   Sometimes it's not obvious a component / thirs party library is perfoming some async actions.
3. Check for the desired event. If possible by testing, what is important for the user.
   ```
    expect(getByText('Important Text for the user')).toBeInTheDocument()
   ```
   In the context of a form submit, we would pass a submit stub as a prop to the form component
   and test the stub, after submitting the form.
   ```
    expect(submitStub).toBeCalledTimes(1)
    expect(submitStub).toBeCalledWith({ username: 'Admin' })
   ```

## Best pratices / good to know

- When testing a component with redundant props, extract them to an object and just modify the related prop for each test.
- When you need to render a component multiple times in one file, you need to call the `testUtils` function `cleanup()` with the `jest` function `afterEach()`.

### Debugging Query and Mutation components

Needs an own section, because it can be very tricky. The context: When testing a Query component, we need to provide the used schema and a matching api request / response mock. The tricky part is, the request / response mock and the schema have to match in every detail.Does not sound very hard, but you get no detailed info, about the root of the problem.
When logging the error, the Query compoinent throwes, it contain something like

```
  networkError: Error: No more mocked responses for the query: query GetCategory
  ($id: Int!) {
    getCategory(id: $id) {
      id
      name
    }
  }
  , variables: {"id":1}
```

So here's how to debug in this situation:

1. Is the actual Query component using variables?
   In this case, are they visible in the error log, with the exact amount and content?
   Are the provided variables having the correct types compared to the provided schema?

2. Is the mocked response structure identical to the schema? It will throw an error, when there are to many or not enough. If you have no other option, it is woth it, to copy the attibutes in the schema an use them in the mock, with some manually created data.

3. Are the mocked query (e.g. GetCategory) and the actually used query identcal?

Fixtures
For a lot tests we are using fixtures. All fixtures are stored in the store directory.
We try to use as less "hardcoded" data in the tests as possible.
E.g. when testing a Mutation component, you need to provide an id for the specific entry, you want to update delete.
And you will have to compare the result against some data. Try to use the same fixture for the input (id) and output (mutation result).
This way we are very flexible when it comes to editing the fixtures.
