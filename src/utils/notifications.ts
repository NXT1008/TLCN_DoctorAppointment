export class Notification {
  static getAccesstoken = async ({
    client_email,
    private_key,
  }: {
    client_email: string;
    private_key: string;
  }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        email: client_email,
        key: private_key,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch(
        'https://rncomponent.com/get-accesstoken',
        requestOptions
      );
      const result = await response.json();

      if (result.data) {
        return result.data;
      }

      return `Can not get accesstoken`;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
