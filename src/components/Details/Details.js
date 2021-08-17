import React, { useEffect, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Detail from "./Detail";
import { useSelector } from "react-redux";
import Indicator from "../Indicator";
import FirestoreDatabase from "../../service/firestore_database";

const db = new FirestoreDatabase();

const Wrapper = styled.ul`
  overflow-y: auto;
  flex: 1 1 30rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: max-content;
  list-style: none;
  font-size: 1.4rem;
`;

const Details = () => {
  const {
    detail: { isLoading, list, isError },
  } = useSelector((state) => state.functionTest);

  const ulRef = useRef();
  const totalRef = useRef(0);
  const [storedList, setStoredList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false);

  useEffect(() => {
    if (!list.length) {
      return;
    }

    totalRef.current = list.length;
    setStoredList(list.slice(0, 10));
  }, [list]);

  const handleScroll = useCallback(async () => {
    const { clientHeight, scrollHeight, scrollTop } = ulRef.current;
    const atBottom = Math.round(scrollTop + clientHeight) >= scrollHeight;

    if (atBottom && hasMore) {
      console.log("end--------------------");
      setIsInfiniteLoading(true);
      const nextList = await db.getFuncTestDetil({
        // Test
        type: "APPLICATION",
        applicationName: "Epr",
        deviceName: "iPhoneXR",
        date: "2021-07-01",
        status: "Pass",
        lastPage: storedList.length,
      });
      setStoredList((prevState) => prevState.concat(nextList));
      setIsInfiniteLoading(false);
    }
  }, [hasMore, storedList]);

  useEffect(() => {
    if (!storedList.length) {
      return;
    }

    if (storedList.length === totalRef.current) {
      setHasMore(false);
    }

    const ul = ulRef.current;
    ul.addEventListener("scroll", handleScroll);
    return () => {
      ul.removeEventListener("scroll", handleScroll);
    };
  }, [storedList, handleScroll]);

  return (
    <>
      {isError && <Indicator type="error" isDetail={true} />}
      {isLoading && <Indicator type="loading" isDetail={true} />}
      {!isLoading &&
        !isError &&
        (!storedList.length ? (
          <Indicator type="empty" isDetail={true} />
        ) : (
          <Wrapper ref={ulRef}>
            {storedList.map((detail, index) => (
              <Detail
                key={index}
                detail={detail}
                // 📌 짝수일 때는 뒤에서 두 개, 홀수일 때는 뒤에서 한 개 flag=true 전달
                flag={
                  length % 2 === 0
                    ? index === length - 1 || index === length - 2
                    : index === length - 1
                }
              />
            ))}
            {hasMore && isInfiniteLoading && (
              <div style={{ fontSize: "10rem" }}>...loading</div>
            )}
          </Wrapper>
        ))}
    </>
  );
};

export default Details;
