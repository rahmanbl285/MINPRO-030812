export interface IEvent {
    eventTitle: string;
    startDate: Date;
    endDate: Date;
    eventImage: string;
    eventLocation: string;
    description: string; 
    eventSlug?: string; 
    ticketName: string;
    isPaid: boolean; 
    availableSeat: number;
    ticketPrice: number;
    startSaleDate: Date;
    endSaleDate: Date;
  }
  