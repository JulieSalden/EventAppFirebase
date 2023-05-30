import { Select } from "@chakra-ui/react";
import { Formik } from "formik";
import { getDatabase, ref, child, get } from "firebase/database";

//fetchen gekozen filters
export const FilterEvents = ({ setEventChoice, events }) => {
  const dbRef = ref(getDatabase());
  const fetchByAz = async () => {
    const sortedAzEvents = get(
      child(dbRef, `events/events?_sort=title&_order=asc`)
    )
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // const sortedAzEvents = await fetch(
    //   "https://eventapp-bbafa-default-rtdb.europe-west1.firebasedatabase.app/events/events?_sort=title&_order=asc.json"
    // );
    return { sortedAzEvents: await sortedAzEvents.json() };
  };

  const fetchByDate = async () => {
    const sortedDateEvents = get(
      child(dbRef, `events/events?_sort=startTime&_order=asc`)
    )
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // const sortedDateEvents = await fetch(
    //   "https://eventapp-bbafa-default-rtdb.europe-west1.firebasedatabase.app/events/events?_sort=startTime&_order=asc.json"
    // );
    return { sortedDateEvents: await sortedDateEvents.json() };
  };

  const fetchByCategory = async () => {
    const sortedCategoryEvents = get(
      child(dbRef, `events?_sort=categoryIds&_order=asc`)
    )
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // const sortedCategoryEvents = await fetch(
    //   "https://eventapp-bbafa-default-rtdb.europe-west1.firebasedatabase.app/events/events?_sort=categoryIds&_order=asc.json"
    // );
    return { sortedCategoryEvents: await sortedCategoryEvents.json() };
  };

  // aanroepen fetch van gekozen filter en state veranderen voor eventspage
  const handleFilterChoice = (e) => {
    if (e.target.value == "az") {
      fetchByAz().then(({ sortedAzEvents }) => {
        setEventChoice(sortedAzEvents);
      });
    }

    if (e.target.value == "date") {
      fetchByDate().then(({ sortedDateEvents }) => {
        setEventChoice(sortedDateEvents);
      });
    }

    if (e.target.value == "category") {
      fetchByCategory().then(({ sortedCategoryEvents }) => {
        setEventChoice(sortedCategoryEvents);
      });
    } else {
      setEventChoice(events);
    }
  };

  return (
    <Formik>
      <Select
        fontWeight={"450"}
        color="black"
        width={250}
        bg="white"
        placeholder="Filter Events"
        onChange={handleFilterChoice}
        mb={3}
      >
        <option value="az">A-z</option>
        <option value="date">Date</option>
        <option value="category">Category</option>
      </Select>
    </Formik>
  );
};
