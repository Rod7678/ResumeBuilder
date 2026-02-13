import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

let url = "http://localhost:3000/api";

export const saveUserDetail = async (data) => {
  const formData = {
    full_name: data.full_name,
    email: data.email,
    location: data.location,
    phone: data.phone,
    pro_title: data.title,
  };
  const response = await fetch(`${url}/users`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occured to save user detail");
    error.status = response.status;
    error.info = await response.json();
    throw error;
  }

  const user = await response.json();
  
  return user;
};

export const fetchLatestUser = async () => {
  const response = await fetch(`${url}/users/latest`);
  if (!response.ok) {
    const error = new Error("An error occurred during fetching user");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
};

export const fetchUserDetail = async ({ queryKey, signal }) => {
  const [, userId] = queryKey;
  const response = await fetch(`${url}/users/${userId}`, { signal });
  if (!response.ok) {
    const error = new Error("An error occurred during fetching user");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
};

export const SaveUserProfessionalData = async (data) => {
  const response = await fetch(`${url}/professional/latest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = new Error(
      "An error occuered during sending professional data",
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();

  return res;
};

export const saveProjectDetails = async (data) => {
  const response = await fetch(`${url}/projects/latest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = new Error("An error occured during sending Project Details");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();

  return res;
};

export const SaveEducationDetails = async (data) => {
  const response = await fetch(`${url}/education/latest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = new Error(
      "An error occured during sending education details",
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();

  return res;
};

export const fetchLatestResume = async () => {
  const res = await fetch(`${url}/resume/latest`);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch resume");
  }

  return res.json();
};
