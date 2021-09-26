function foundPerson(people) {
  for(let i = 0; i < people.length; i++) {
    const candidates = ["Don", "John", "Kent"];
    return people.find(p => candidates.includes(p)) || "";
  }
}