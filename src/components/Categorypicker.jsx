import { Select } from "@chakra-ui/react";
import { Formik } from "formik";
import { getDatabase, ref, child, get } from "firebase/database";

// fetchen gekozen categorie
export const Categorypicker = ({ setEventChoice, categories }) => {
  const fetchCatergoryQuery = async (categoryId) => {
    const dbRef = ref(getDatabase());
    const categoryEvents = get(
      child(dbRef, `events/?&categoryIds_like=${categoryId}`)
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

    // await fetch(
    //   `https://eventapp-bbafa-default-rtdb.europe-west1.firebasedatabase.app/events/?&categoryIds_like=${categoryId}.json`
    // );
    return {
      event: await categoryEvents.json(),
    };
  };

  // aanroepen fetch van gekozen categorie en state veranderen voor eventspage
  const handleCategoryChoice = (e) => {
    const categoryId = e.target.value;
    fetchCatergoryQuery(categoryId).then(({ event }) => {
      setEventChoice(event);
    });
  };

  return (
    <Formik>
      <Select
        fontWeight={"450"}
        color="black"
        width={250}
        bg="white"
        name="categoryIds"
        onChange={handleCategoryChoice}
        placeholder="Search by category"
        mb={3}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </Formik>
  );
};
