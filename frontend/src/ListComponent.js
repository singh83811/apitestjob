import React, { Component } from 'react'

import './App.css';

//jQuery libraries

import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

//For API Requests
import axios from 'axios';

class ListComponent extends Component
{

	// State array variable to save and show data
	constructor ( props )
	{
		super( props )
		this.state = {
			data: [],
			NonAirbnbSum: 0,
			SubTotalAerie: 0,
			SubTotal20260: 0,
			SubTotal304: 0,
			total: 0,
			TotalNetIncome: 0,
			TotalAccommFare: 0,
			TotalCleanFare: 0,
			TotalTax: 0,
			TotalADJ: 0,
			TotalDISC: 0,
			TotalCNCLFee: 0,
			TotalHostFee: 0,
			TotalBalanceDue: 0,
			GrandTotal: 0

		}
	}
	componentDidMount ()
	{
		//Get all users details in bootstrap table
		axios.get( 'http://localhost:8000/api/reservations' ).then( res => 
		{
			//Storing users detail in state array object
			this.setState( { data: res.data.data } );
			res.data.data.forEach( ( item ) =>
			{
				if ( item.listing.nickname.includes( 'Aerie' ) )
				{
					this.state.SubTotalAerie += item.money.netIncome
				}
				if ( item.listing.nickname.includes( '20260' ) )
				{
					this.state.SubTotal20260 += item.money.netIncome
				}

				if ( item.listing.nickname.includes( '304' ) )
				{
					this.state.SubTotal304 += item.money.netIncome
				}
				if ( item.listing.nickname.includes( 'Aerie' ) && item.source != "airbnb2" )
				{
					this.state.NonAirbnbSum += item.money.netIncome
				}

				this.state.total = this.state.SubTotalAerie + this.state.SubTotal20260 + this.state.SubTotal304;
				this.state.TotalNetIncome += item.money.netIncome
				this.state.TotalAccommFare += item.money.fareAccommodation
				this.state.TotalCleanFare += item.money.fareCleaning
				this.state.TotalTax += item.money.hostServiceFeeIncTax
				this.state.TotalADJ += item.money.fareAccommodationAdjustment
				this.state.TotalDISC += item.money.fareAccommodationDiscount
				this.state.TotalCNCLFee += item.money.fareCleaning
				this.state.TotalHostFee += item.money.hostServiceFee
				this.state.TotalBalanceDue += item.money.balanceDue
				this.state.GrandTotal += item.money.totalPaid
			} )

		} );
		//initialize datatable
		$( document ).ready( function ()
		{
			setTimeout( function ()
			{
				$( '#example' ).DataTable();
			}, 1000 );
		} );
	}
	render ()
	{
		//Datatable HTML
		return (
			<div className="MainDiv">
				<div className="jumbotron text-center">
					<h3>Reservation Table</h3>
				</div>

				<div className="container-fluid">

					<table id="example" className="table table-hover table-striped table-bordered">
						<thead>
							<tr>
								<th> LISTING'S NICKNAME</th>
								<th> CHECK IN</th>
								<th> CHECK OUT</th>
								<th> NIGHTS</th>
								<th> GUESTS NAME</th>
								<th> SOURCE</th>
								<th> CREATION DATE</th>
								<th> NET INCOME</th>
								<th> CONF DATE</th>
								<th> ACCOMM FARE</th>
								<th> CLEAN FARE</th>
								<th> TAX</th>
								<th> ADJ</th>
								<th> DISC</th>
								<th> CNCL FEE</th>
								<th> HOST FEE</th>
								<th> BALANCE DUE</th>
								<th> TOTAL PAID</th>
							</tr>
						</thead>
						<tbody>
							{ this.state.data.map( ( reservation ) =>
							{
								return (

									<tr key={ reservation.id }>
										<td> { reservation.listing.nickname }</td>
										<td> { reservation.checkIn } </td>
										<td> { reservation.checkOut }</td>
										<td> { reservation.nightsCount }</td>
										<td> { reservation.guest.fullName }</td>
										<td> { reservation.source }</td>
										<td> { reservation.createdAt }</td>
										<td>${ reservation.money.netIncome }</td>
										<td> { reservation.confirmedAt }</td>
										<td>${ reservation.money.fareAccommodation }</td>
										<td>${ reservation.money.fareCleaning }</td>
										<td>${ reservation.money.hostServiceFeeIncTax }</td>
										<td>${ reservation.money.fareAccommodationAdjustment }</td>
										<td>${ reservation.money.fareAccommodationDiscount }</td>
										<td>${ reservation.money.fareCleaning }</td>
										<td>${ reservation.money.hostServiceFee }</td>
										<td>${ reservation.money.balanceDue }</td>
										<td>${ reservation.money.totalPaid }</td>
									</tr>
								)
							} ) }
						</tbody>
						<thead></thead>
						<tbody>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td>${ parseFloat( this.state.TotalNetIncome.toFixed( 2 ) ) }</td>
								<td></td>
								<td>${ parseFloat( this.state.TotalAccommFare.toFixed( 2 ) ) }</td>
								<td>${ parseFloat( this.state.TotalCleanFare.toFixed( 2 ) ) }</td>
								<td>${ parseFloat( this.state.TotalTax.toFixed( 2 ) ) }</td>
								<td>${ parseFloat( this.state.TotalADJ.toFixed( 2 ) ) }</td>
								<td>${ parseFloat( this.state.TotalDISC.toFixed( 2 ) ) }</td>
								<td>${ parseFloat( this.state.TotalCNCLFee.toFixed( 2 ) ) }</td>
								<td>${ parseFloat( this.state.TotalHostFee.toFixed( 2 ) ) }</td>
								<td>${ parseFloat( this.state.TotalBalanceDue.toFixed( 2 ) ) }</td>
								<td>${ parseFloat( this.state.GrandTotal.toFixed( 2 ) ) }</td>
							</tr>
						</tbody>
					</table>
					<div className='row my-3'>
						<div className='col-md-6'>
							<label className='filterLabel'>Subtotal Aerie
								<br />
								<strong>${ parseFloat( this.state.SubTotalAerie.toFixed( 2 ) ) }</strong>
							</label>
						</div>
						<div className='col-md-6'>
							<label className='filterLabel'>Aerie (non Airbnb revenue)
								<br />
								<strong>${ parseFloat( this.state.NonAirbnbSum.toFixed( 2 ) ) }</strong>
							</label>
						</div>
					</div>
					<div className='row my-3'>
						<div className='col-md-6'>
							<label className='filterLabel'>Subtotal 20260
								<br />
								<strong>${ parseFloat( this.state.SubTotal20260.toFixed( 2 ) ) }</strong>
							</label>
						</div>
						<div className='col-md-6'>
							<label className='filterLabel'>Aerie Sales Tax
								<br />
								<strong>${ parseFloat( ( this.state.NonAirbnbSum * 0.07 ).toFixed( 2 ) ) }</strong>
							</label>
						</div>
					</div>
					<div className='row my-3'>
						<div className='col-md-6'>
							<label className='filterLabel'>Subtotal 304
								<br />
								<strong>${ parseFloat( this.state.SubTotal304.toFixed( 2 ) ) }</strong>
							</label>
						</div>
						<div className='col-md-6'>
							<label className='filterLabel'>Aerie Surtax
								<br />
								<strong>${ parseFloat( ( this.state.NonAirbnbSum * 0.01 ).toFixed( 2 ) ) }</strong>
							</label>
						</div>
					</div>
					<div className='row my-3'>
						<div className='col-md-12'>
							<label className='filterLabel'>Total
								<br />
								<strong>${ parseFloat( this.state.total.toFixed( 2 ) ) }</strong>
							</label>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default ListComponent;