export async function fetchingCertificates() {
  return await $fetch("/api/certificates");
}
