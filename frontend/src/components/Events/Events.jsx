import React, { useEffect } from "react";
import EventCard from "./EventCard";
import styles from "../../styles/style";
import { useSelector } from "react-redux";
const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>
          <div className="w-full grid">
            {allEvents.legth !== 0 && (
             <>
                {/* <EventCard data={allEvents && allEvents[0]} /> */}
              {/* <EventCard data={allEvents && allEvents[1]} /> */}
             </>

            )}
            <h4>{allEvents?.length === 0 && "No Events have!"}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
