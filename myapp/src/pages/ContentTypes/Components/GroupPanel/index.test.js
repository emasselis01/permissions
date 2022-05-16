import {
  fireEvent,
  getByLabelText,
  getByRole,
  getByTestId,
  getByText,
  queryByText,
  render,
  screen
} from "@testing-library/react"
import '@testing-library/jest-dom'
import React from 'react';
import {EditGroupType} from "./index"
// import admin from "@/pages/Admin";


// https://testing-library.com/docs/react-testing-library/intro/


const permission = [
  {
    "id": 1,
    "type": "log entry",
    "name": "Can add log entry",
    "codename": "add_logentry",
    "group": "admin"
  },
  {
    "id": 2,
    "type": "log entry",
    "name": "Can change log entry",
    "codename": "change_logentry",
    "group": "admin"
  },
  {
    "id": 3,
    "type": "log entry",
    "name": "Can delete log entry",
    "codename": "delete_logentry",
    "group": "admin"
  },

  {
    "id": 292,
    "type": "extra permissions",
    "name": "Access W3 - Mallusk",
    "codename": "can_access_W3",
    "group": "wms"
  }
]


const MockPermissionComponent = () => {
  return (
    <EditGroupType permissions={permission}  permissionSelected={[]}/>
  )
}

// "Can change company"
test('does it render?', () => {
  const {container} = render(<MockPermissionComponent/>);
  expect(getByText(container, 'Log Entry')).toBeInTheDocument();
  //console.log(queryByText(container, 'Access W3 - Mallusk'))
  expect(queryByText(container, 'Access W3 - Mallusk')).toBeNull();

  const extra_row = getByRole(container, 'row', { name: /extra permissions/i })
  expect(extra_row).toBeDefined();

  const find_button =  getByLabelText(extra_row, "Expand row")//getByRole(container,'button')  // class="ant-table-row-expand-icon ant-table-row-expand-icon-spaced"   ------ class="ant-table-row-expand-icon ant-table-row-expand-icon-collapsed"
  expect(find_button).toBeDefined();

  fireEvent.click(find_button)

   const new_Permission = getByRole(container, 'checkbox', {
     name: /access w3 \- mallusk/i
   })
  expect(queryByText(container, 'Access W3 - Mallusk')).toBeInTheDocument();
  expect(new_Permission).toBeDefined()

  // const tmp = (<div data-testid={"my_random_element"}></div>)
  // getByTestId()

  const delete_heading = getByRole(container, 'columnheader', {name: /delete/i})
  expect(delete_heading).toBeDefined();

})

//
// test('ensure clicked once', () => {
//   const testFunc = jest.fn();
//   const {container} = render(<MockPermissionComponent onPermissionSelected={(x)=> testFunc(x)}/>);
//
//   const find_checkbox = container.querySelector('#checkbox_id123');
//   fireEvent.change(find_checkbox, {target: { value: 123}});
//
//   expect(testFunc).toBeCalledWith(123);
//   expect(testFunc).toBeCalledTimes(1);
// })
//
