export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Event",
    route: "/events/create",
  },
  {
    label: "Profile",
    route: "/profile",
  },
];

export const eventDefaultValues = {
  title: '',
  desc: '',
  countryId : '',
  cityId : '',
  location: '',
  image: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}
