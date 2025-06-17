export const teacherColumnData: any[] = [
  { title: 'Username', key: 'username' },
  { title: 'Email', key: 'email' }
];

export const pupilsColumndata = [
  {
    title: "Username",
    key: 'username'
  },
  {
    title: "Email", key: 'email'
  },
  { title: "First Name", key: 'first_name' },
  {
    title: "Class Name",
    key: 'class_name',
    valueGetter: (row: any) => row.class_name ?? 'No class'
  }
]
export const groupDetails = [{
  title: "Username",
  key: 'username'
}, {
  title: "First Name",
  key: 'first_name'
}, {
  title: "Email",
  key: 'email'
}]