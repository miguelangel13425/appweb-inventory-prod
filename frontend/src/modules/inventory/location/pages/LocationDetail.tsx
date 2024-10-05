import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchLocation } from "@/redux/actions/inventory/locationActions";
import { Spinner } from "@/components";
import {
  Unauthorized,
  Forbidden,
  NotFound,
  ServerError,
} from "@/modules/base/index";
import UpdateDeleteLocationForm from "../components/UpdateDeleteLocationForm";

const LocationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { location, loading, error, status } = useSelector(
    (state: RootState) => state.location
  );

  useEffect(() => {
    dispatch(fetchLocation(id));
  }, [dispatch, id]);

  if (loading) return <Spinner />;

  if (error) {
    if (status === 401) return <Unauthorized />;
    if (status === 403) return <Forbidden />;
    if (status === 404) return <NotFound />;
    if (status === 500) return <ServerError />;
  }

  if (!location) return null;

  return (
    <div className="p-8">
      <UpdateDeleteLocationForm location={location} />
    </div>
  );
};

export default LocationDetail;
