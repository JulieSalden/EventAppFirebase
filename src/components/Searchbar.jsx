import { Input } from "@chakra-ui/react";
import { getDatabase, ref, child, get } from "firebase/database";

// fetchen getypte event
export const Searchbar = ({ setEventChoice }) => {
  const fetchBySearchQuery = async (eventChoice) => {
    const dbRef = ref(getDatabase());
    const choosenEvent = get(child(dbRef, `events/events?q=${eventChoice}`))
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

    // const choosenEvent = await fetch(
    //   `https://eventapp-bbafa-default-rtdb.europe-west1.firebasedatabase.app/events/events?q=${eventChoice}.json`
    // );
    return {
      event: await choosenEvent.json(),
    };
  };

  // aanroepen fetch van getype event en state veranderen voor eventspage
  const handleEventChoice = (e) => {
    const eventChoice = e.target.value;
    fetchBySearchQuery(eventChoice).then(({ event }) => {
      setEventChoice(event);
    });
  };

  return (
    <Input
      onChange={handleEventChoice}
      fontWeight={"450"}
      color="blue.600"
      placeholder="Search for event here.."
      width={250}
      bg="white"
      mb={3}
    ></Input>
  );
};
