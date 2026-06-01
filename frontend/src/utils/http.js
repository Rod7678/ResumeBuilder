import { QueryClient } from "@tanstack/react-query";
// import { json } from "express";

export const queryClient = new QueryClient();

let url = "http://localhost:3000/api";

// User Functions
export const saveUserDetail = async (data) => {
  const formData = {
    full_name: data.fullName,
    email: data.email,
    location: data.location,
    phone: data.phone,
    pro_title: data.proTitle,
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

// Create Functions
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


export const SaveSkillsDetails = async (data) => {
  const response = await fetch(`${url}/skills/latest`,{
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(data),
  });

  if(!response.ok){
    const error = new Error("An error occured during sending skills details");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();
  return res;  
};

export const SaveCertificateDetails = async (data) => {
  const response = await fetch(`${url}/certificates/latest`,{
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(data),
  });

  if(!response.ok){
    const error = new Error("An Error occured during Saving");
    error.code = esponse.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();
  return res;
}

export const SaveLanguageDetails = async (data) => {
  const response = await fetch(`${url}/languages/latest`, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(data),
  });

  if(!response.ok){
    const error = new Error(
      "An error occured during sending language details"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();

  return res;
}


// Update Functions
export const UpdateEducationDetails = async ({data, id}) => {
  const fetchUrl = id ? `${url}/education/entry/${id}` : `${url}/education/latest`;
  const response = await fetch(fetchUrl, {
    method: "PUT",
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

export const UpdateProjectDetails = async ({data, id}) => {
  const fetchUrl = id ? `${url}/projects/entry/${id}` : `${url}/projects/latest`;
  const response = await fetch(fetchUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = new Error("An error occured during sending project details");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();

  return res;
};

export const UpdateSkillsDetails = async ({data, id}) => {
  const fetchUrl = id ? `${url}/skills/entry/${id}` : `${url}/skills/latest`;
  const response = await fetch(fetchUrl, {
    method: "PUT",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(data),
  });
  if(!response.ok){
    const error = new Error("An error occured during sending project details");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();
  return res;
};

export const UpdateCertificateDetails = async ({data, id}) => {
  const fetchUrl = id ? `${url}/certificates/entry/${id}` : `${url}/certificates/latest`;
  const response = await fetch(fetchUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = new Error("An error occured during sending project details");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();

  return res;
};

export const UpdateProfessionalDetails = async ({data, id}) => {
  const fetchUrl = id ? `${url}/professional/entry/${id}` : `${url}/professional/latest`;
  const response = await fetch(fetchUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = new Error("An error occured during sending project details");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();

  return res;
};

export const UpdateLanguageDetails = async ({data, id}) => {
  const fetchUrl = id ? `${url}/languages/entry/${id}` : `${url}/languages/latest`;
  const response = await fetch(fetchUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = new Error("An error occured during sending language details");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();

  return res;
};


// Delete Functions
// If id is provided, delete the specific entry, otherwise delete the latest entry
// Education details deletion
export const DeleteEducationDetails = async (id) => {
  const fetchUrl = id ? `${url}/education/entryDelete/${id}` : `${url}/education/latest`;
  const response = await fetch(fetchUrl, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error(
      "An error occured during deleting education details",
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();

  return res;
};


// Skill details deletion 
export const DeleteSkillDetails = async (id) => {
  const fetchUrl = id ?  `${url}/skills/entryDelete/${id}` : `${url}/skills/latest`;
  const response = await fetch(fetchUrl, {
    method: "DELETE",
  });

  if(!response.ok){
    const error = new Error("An error occured during deleting skill");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();

  return res;
};


// Certificate details deletion
export const DeleteCertificateDetails = async (id) => {
  const fetchUrl = id ?  `${url}/certificates/entryDelete/${id}` : `${url}/certificates/latest`;
  const response = await fetch(fetchUrl, {
    method: "DELETE",
  });

  if(!response.ok){
    const error = new Error("An error occured during deleting certificate");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();

  return res;
};



// Professional details deletion
export const DeleteProfessionalDetails = async (id) => {
  const fetchUrl = id ? `${url}/professional/entry/${id}` : `${url}/professional/latest`;
  const response = await fetch(fetchUrl, {
    method: "DELETE",
  })
  if(!response.ok){
    const error = new Error(
      "An error occured during deleting professional details"
    )
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();
  
  return res;
}


// Project details deletion
export const DeleteProjectDetails = async (id) => {
  const fetchUrl = id ? `${url}/projects/entry/${id}` : `${url}/projects/latest`;
  const response = await fetch(fetchUrl, {
    method: "DELETE",
  })

  if(!response.ok){
    const error = new Error(
      "An error occured during deleting project details"
    )
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();

  return res;
}

// Language details deletion
export const DeleteLanguageDetails = async (id) => {
  const fetchUrl = id ? `${url}/languages/entry/${id}` : `${url}/languages/latest`;
  const response = await fetch(fetchUrl, {
    method: "DELETE",
  });

  if(!response.ok){
    const error = new Error(
      "An error occured during deleting language details"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const res = await response.json();

  return res;
}



// Resume Functions
export const fetchLatestResume = async () => {
  const res = await fetch(`${url}/resume/latest`);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch resume");
  }

  return res.json();
};
