export default function validateName(value) {
  if (!value) {
    return 'Name is required';
  }

  if (!value.trim()) {
    return 'Name is not valid';
  }

  if (value.trim() !== value) {
    return 'Name must not contain spaces before or after';
  }
}
