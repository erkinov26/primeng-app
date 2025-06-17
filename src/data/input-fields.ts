export const teacherInputFields = [
  { label: 'Username', name: 'username', type: 'text', placeholder: 'Enter your username', icon: 'bx bx-user' },
  { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email', icon: 'bx bx-envelope' },
  { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password', icon: 'bx bx-lock' },
  { label: 'First Name', name: 'first_name', type: 'text', placeholder: 'Enter your first name', icon: 'bx bx-envelope' },
  { label: 'Last Name', name: 'last_name', type: 'text', placeholder: 'Enter your last name', icon: 'bx bx-lock' },
];

export const classInpuFields = [
  { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter your class name', icon: 'bx bx-user' },
  {
    label: 'Teacher',
    name: 'curator_id',
    type: 'select',
    placeholder: 'Select your curator',
    icon: 'bx bx-user',
    options: [],
    noOptionsMessage: 'No curators available. Add curators first.',
    addRoute: '/teachers'
  }
];