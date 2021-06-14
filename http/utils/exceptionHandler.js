const handleException = (err, req, res) => {
  switch (error.name) {
    case "http": {
      console.log("comming here", err.name);
    }
    default: {
    }
  }
};

module.exports = handleException;
